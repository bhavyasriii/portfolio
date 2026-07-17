import { useState } from 'react';
import {
  ShieldCheck, BarChart3, Sparkles, LayoutGrid, Compass, Zap,
  ArrowUpRight, ClipboardList, AlertCircle, Terminal,
  Stethoscope, ArrowRight, Activity, AlertTriangle, Check, CheckCircle,
  RefreshCw, Flame, CheckSquare, HelpCircle, Trash2, Plus, Database
} from 'lucide-react';

// =============================================================================
// TYPES (ported from your types.ts)
// =============================================================================
interface EhrRecord {
  id: string;
  drug_name: string;
  dosage: string;
  frequency: string;
}

interface Discrepancy {
  drug_name: string;
  severity: 'HIGH' | 'MEDIUM';
  type: string;
  details: string;
  master_record_value: string | null;
  intake_record_value: string | null;
  confidence: number;
}

// =============================================================================
// LOCAL CLINICAL RECONCILIATION ENGINE
// Ported from your real server.ts localClinicalReconciliationFallback().
// Runs entirely client-side — no API key needed. Actually evaluates whatever
// is currently in the EHR table and intake textarea, so editing either one
// genuinely changes the results (this is the same rules engine your live
// app falls back to when Gemini is unavailable).
// =============================================================================
function runClinicalReconciliation(ehrRecords: EhrRecord[], intakeText: string): Discrepancy[] {
  const intake = intakeText.toLowerCase();
  const discrepancies: Discrepancy[] = [];

  for (const med of ehrRecords) {
    const name = med.drug_name.toLowerCase();

    const isMentioned =
      intake.includes(name) ||
      (name.includes('atorvastatin') && intake.includes('cholesterol')) ||
      (name.includes('metformin') && (intake.includes('diabetes') || intake.includes('metformin')));

    if (!isMentioned) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'HIGH',
        type: 'OMISSION',
        details: `${med.drug_name} is prescribed in the Master EHR (${med.dosage} ${med.frequency}) but is completely omitted from the patient's reported intake record.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: null,
        confidence: 95
      });
      continue;
    }

    if (name.includes('lisinopril') && intake.includes('20mg')) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'MEDIUM',
        type: 'DOSAGE_MISMATCH',
        details: `Dosage mismatch detected. The Master EHR prescribes Lisinopril ${med.dosage}, but the patient reports taking Lisinopril 20mg.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: '20mg Once daily',
        confidence: 98
      });
    }

    if (name.includes('metformin') && (intake.includes('once a day') || intake.includes('once daily') || intake.includes('stomach') || intake.includes('hurt'))) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'MEDIUM',
        type: 'FREQUENCY_MISMATCH',
        details: `Frequency mismatch detected. The Master EHR prescribes Metformin ${med.dosage} ${med.frequency}, but the patient reports taking it once a day because twice a day hurts their stomach.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: `${med.dosage} Once daily`,
        confidence: 97
      });
    }

    if ((name.includes('atorvastatin') || name.includes('statin')) && (intake.includes('forgot') || intake.includes('occasionally') || intake.includes('cholesterol'))) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'HIGH',
        type: 'REQUIRES_HUMAN_CLARIFICATION',
        details: `Patient reports they "forgot the name of their cholesterol medication but take it occasionally." This requires clinician clarification to verify if they are taking ${med.drug_name} or another statin.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: 'Unknown cholesterol drug taken occasionally',
        confidence: 99
      });
    }

    if (name.includes('amoxicillin') && (intake.includes('10ml') || intake.includes('double'))) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'HIGH',
        type: 'DOSAGE_MISMATCH',
        details: `CRITICAL OVERDOSE WARNING: Pediatric patient is taking Amoxicillin 10mL twice daily (double the prescribed ${med.dosage} dose) because the parent believed the prescribed dose was not effective. Potentially toxic dosage.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: '10mL (800mg) Twice daily',
        confidence: 98
      });
    }

    if (name.includes('celecoxib') && (intake.includes('ibuprofen') || intake.includes('stopped') || intake.includes('expensive'))) {
      discrepancies.push({
        drug_name: med.drug_name,
        severity: 'HIGH',
        type: 'OMISSION',
        details: `Patient reports self-discontinuing prescribed Celecoxib ${med.dosage} due to fixed-income cost barriers.`,
        master_record_value: `${med.dosage} ${med.frequency}`,
        intake_record_value: 'Discontinued by patient (Cost-barrier)',
        confidence: 96
      });
    }
  }

  if (intake.includes('ibuprofen')) {
    discrepancies.push({
      drug_name: 'Ibuprofen (OTC)',
      severity: 'HIGH',
      type: 'DUPLICATION',
      details: `THERAPEUTIC DUPLICATION ALERT: Patient reports taking OTC Ibuprofen 400mg three times daily alongside another prescribed NSAID. This duplication significantly raises gastrointestinal and cardiovascular risk in geriatric patients.`,
      master_record_value: null,
      intake_record_value: '400mg Three times daily',
      confidence: 98
    });
  }

  return discrepancies;
}

// =============================================================================
// CLINICAL SCENARIOS — matching the real app's Simulation Console
// =============================================================================
interface ClinicalScenario {
  id: string;
  title: string;
  description: string;
  ehrRecords: EhrRecord[];
  intakeText: string;
}

const CLINICAL_SCENARIOS: ClinicalScenario[] = [
  {
    id: 'standard-adult',
    title: '1. Prompt Test Case (Lisinopril, Metformin, Atorvastatin)',
    description: 'Standard adult cases tracking Lisinopril, Metformin frequency shifts, & Atorvastatin clarification.',
    ehrRecords: [
      { id: '1', drug_name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { id: '2', drug_name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals' },
      { id: '3', drug_name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' },
      { id: '4', drug_name: 'Amoxicillin', dosage: '5mL (400mg)', frequency: 'Twice daily' },
      { id: '5', drug_name: 'Celecoxib', dosage: '100mg', frequency: 'Once daily' }
    ],
    intakeText: "Patient states they are taking Lisinopril 20mg once a day. Metformin 500mg is only taken once daily in the morning because taking it twice a day makes their stomach hurt. Patient forgot the name of their cholesterol medication but mentions taking some cholesterol drug occasionally."
  },
  {
    id: 'pediatric-safety',
    title: '2. Pediatric Dosage Alert (Overdose & Safety Risks)',
    description: 'High-priority liquid formulation error. Guard doubling of 5mL script to 10mL toxic level.',
    ehrRecords: [
      { id: '1', drug_name: 'Amoxicillin', dosage: '5mL (400mg)', frequency: 'Twice daily' }
    ],
    intakeText: "For the toddler, they are giving Amoxicillin 10mL twice daily because 5mL didn't seem to clear the ear cough."
  },
  {
    id: 'geriatric-nsaid',
    title: '3. Geriatric NSAID Therapeutic Duplication',
    description: 'Socioeconomic cost barrier causing Celecoxib self-discontinuation and duplicate high-risk OTC Ibuprofen use.',
    ehrRecords: [
      { id: '1', drug_name: 'Celecoxib', dosage: '100mg', frequency: 'Once daily' }
    ],
    intakeText: "Celecoxib was stopped because it is too expensive, so they are taking OTC Ibuprofen 400mg three times daily instead."
  },
  {
    id: 'clean',
    title: '4. Clean Reconciliation (100% Concordance)',
    description: 'Ideal standard reconciliation. EHR prescribes Lisinopril & Metformin, fully consistent in patient report.',
    ehrRecords: [
      { id: '1', drug_name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { id: '2', drug_name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals' }
    ],
    intakeText: "Patient reports taking Lisinopril 10mg once daily as prescribed, and Metformin 500mg twice a day with meals exactly as directed."
  }
];

// =============================================================================
// SANDBOX — ported directly from your real App.tsx
// =============================================================================
function ReconciliationSandbox() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(CLINICAL_SCENARIOS[0].id);

  const [intakeText, setIntakeText] = useState<string>(CLINICAL_SCENARIOS[0].intakeText);

  const [ehrRecords, setEhrRecords] = useState<EhrRecord[]>(CLINICAL_SCENARIOS[0].ehrRecords);

  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('');

  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [pendingAudit, setPendingAudit] = useState(0);
  const [acceptedChanges, setAcceptedChanges] = useState(0);
  const [dismissedAlerts, setDismissedAlerts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvingMeds, setResolvingMeds] = useState<string[]>([]);

  const handleSelectScenario = (scenario: ClinicalScenario) => {
    setSelectedScenarioId(scenario.id);
    setEhrRecords(scenario.ehrRecords);
    setIntakeText(scenario.intakeText);
    setHasAnalyzed(false);
    setDiscrepancies([]);
    setPendingAudit(0);
    setAcceptedChanges(0);
    setDismissedAlerts(0);
    setResolvingMeds([]);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = runClinicalReconciliation(ehrRecords, intakeText);
      setDiscrepancies(results);
      setPendingAudit(results.length);
      setAcceptedChanges(0);
      setDismissedAlerts(0);
      setHasAnalyzed(true);
      setIsLoading(false);
    }, 400);
  };

  const handleAcceptOverride = (drugName: string) => {
    if (resolvingMeds.includes(drugName)) return;
    setResolvingMeds((prev) => [...prev, drugName]);
    setTimeout(() => {
      setDiscrepancies((prev) => prev.filter((d) => d.drug_name !== drugName));
      setPendingAudit((prev) => prev - 1);
      setAcceptedChanges((prev) => prev + 1);
      setResolvingMeds((prev) => prev.filter((name) => name !== drugName));
    }, 300);
  };

  const handleDismissAlert = (drugName: string) => {
    if (resolvingMeds.includes(drugName)) return;
    setResolvingMeds((prev) => [...prev, drugName]);
    setTimeout(() => {
      setDiscrepancies((prev) => prev.filter((d) => d.drug_name !== drugName));
      setPendingAudit((prev) => prev - 1);
      setDismissedAlerts((prev) => prev + 1);
      setResolvingMeds((prev) => prev.filter((name) => name !== drugName));
    }, 300);
  };

  const handleReset = () => {
    setHasAnalyzed(false);
    setDiscrepancies([]);
    setPendingAudit(0);
    setAcceptedChanges(0);
    setDismissedAlerts(0);
    setResolvingMeds([]);
  };

  const handleAddEhrRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrug.trim()) return;
    setEhrRecords((prev) => [
      ...prev,
      { id: Date.now().toString(), drug_name: newDrug.trim(), dosage: newDosage.trim() || '—', frequency: newFrequency.trim() || '—' }
    ]);
    setNewDrug('');
    setNewDosage('');
    setNewFrequency('');
  };

  const handleDeleteEhrRecord = (id: string) => {
    setEhrRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  const totalAuditItems = acceptedChanges + dismissedAlerts;
  const isFullyReconciled = hasAnalyzed && discrepancies.length === 0;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">

      <div className="bg-white border-b border-slate-200 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Stethoscope className="w-5 h-5" />
              </span>
              <span>Clinical Medication Reconciliation</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Patient Workspace: <span className="font-semibold text-slate-700">MRN-90210</span>
            </p>
          </div>
          <div className="sm:absolute sm:right-0 flex items-center gap-2 bg-white border px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${isFullyReconciled ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
            <span className={isFullyReconciled ? 'text-emerald-700' : 'text-rose-700'}>
              {isFullyReconciled ? 'Status: Reconciliation Complete' : 'Status: Audit Required'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200 px-2 py-1 rounded">
              Simulation Console
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Clinical Reconciliation Scenario
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CLINICAL_SCENARIOS.map((scenario) => {
              const isActive = scenario.id === selectedScenarioId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col ${
                    isActive ? 'border-blue-400 bg-blue-50/40 ring-1 ring-blue-400' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="text-sm font-bold text-blue-700 leading-snug mb-1.5">{scenario.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed flex-1">{scenario.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {scenario.ehrRecords.length} Prescription{scenario.ehrRecords.length === 1 ? '' : 's'}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                        Active Profile
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-5 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-extrabold bg-blue-500 text-blue-100 px-2 py-0.5 rounded tracking-wider">
              Verification Dashboard
            </span>
            <h4 className="text-lg font-bold mt-1">Active Patient EHR Reconciliation Audit</h4>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              This system cross-references active drug registries against unstructured verbal and pharmacy intake data. Review each highlighted variance to update the record of truth.
            </p>
          </div>
          {hasAnalyzed && (
            <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs font-semibold">
              <div className="text-center px-2 border-r border-slate-700">
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Pending Audit</span>
                <span className="text-base font-extrabold text-white">{pendingAudit}</span>
              </div>
              <div className="text-center px-2 border-r border-slate-700">
                <span className="block text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Accepted</span>
                <span className="text-base font-extrabold text-emerald-400">{acceptedChanges}</span>
              </div>
              <div className="text-center px-2">
                <span className="block text-rose-400 text-[10px] uppercase font-bold tracking-wider">Dismissed</span>
                <span className="text-base font-extrabold text-rose-400">{dismissedAlerts}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">EHR Core Repository</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-500 uppercase tracking-wider">
                  <Database className="w-3.5 h-3.5" />
                  <span>Connected Registry</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 tracking-tight">Master Medication Record (EHR Database)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  Active, verified clinical prescriptions within the patient's primary electronic health chart.
                </p>
              </div>

              <div className="overflow-hidden border border-slate-150 rounded-lg bg-slate-50/50">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Drug Name</th>
                      <th className="py-2.5 px-3">Dosage</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {ehrRecords.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400 italic">
                          No active records. Use the form below to insert prescriptions.
                        </td>
                      </tr>
                    ) : (
                      ehrRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{rec.drug_name}</td>
                          <td className="py-2.5 px-3">
                            <code className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">{rec.dosage}</code>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{rec.frequency}</td>
                          <td className="py-2.5 px-3 text-right">
                            <button onClick={() => handleDeleteEhrRecord(rec.id)} className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-slate-150 cursor-pointer" title="Remove Record">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <form onSubmit={handleAddEhrRecord} className="border-t border-slate-150 pt-4 mt-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Add Clinical Prescription</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    value={newDrug}
                    onChange={(e) => setNewDrug(e.target.value)}
                    placeholder="Drug name"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="text"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    placeholder="Dosage"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="text"
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value)}
                    placeholder="Frequency"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Record</span>
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Input Registry</span>
                <h3 className="text-base font-bold text-slate-800 tracking-tight mt-0.5">1. Raw Pharmacy Intake Data</h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  Submit unstructured disclosures, clinical transcripts, and pharmacy lists to run the automated reconciliation engine.
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={intakeText}
                  onChange={(e) => setIntakeText(e.target.value)}
                  placeholder="Paste unstructured patient disclosures, EHR notes, or pharmacy intake sheets here..."
                  className="w-full h-60 p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed text-slate-700 transition-all"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>MRN-90210 Sync Channel Active</span>
                </div>
              </div>

              <div className="flex gap-2">
                {hasAnalyzed && (
                  <button onClick={handleReset} className="px-4 py-3 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-lg transition-all cursor-pointer flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Patient Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Intake Data</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Audit Engine Output</span>
              <h3 className="text-base font-bold text-slate-800 tracking-tight mt-0.5">2. Reconciliation Deltas</h3>
            </div>

            {hasAnalyzed && !isLoading && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center gap-1.5 mb-4">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Historical Metric Trends</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Dosage Mismatches</span>
                      <span className="font-mono text-slate-500">80%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Omissions</span>
                      <span className="font-mono text-slate-500">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Therapeutic Duplications</span>
                      <span className="font-mono text-slate-500">20%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!hasAnalyzed && !isLoading && (
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[420px] bg-white shadow-sm">
                <AlertCircle className="w-12 h-12 text-slate-300 mb-3" />
                <span className="text-sm font-bold text-slate-700 block">Reconciliation Data Pending</span>
                <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  The clinical evaluation workspace is empty. Paste data in the intake container on the left, then trigger the analysis pipeline.
                </p>
                <button onClick={handleAnalyze} className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Execute Analysis Pipeline</span>
                </button>
              </div>
            )}

            {isLoading && (
              <div className="border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[420px] bg-white">
                <div className="relative flex items-center justify-center mb-5">
                  <div className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-400 opacity-20" />
                  <div className="relative rounded-full p-3.5 bg-blue-50 text-blue-600 animate-spin">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800">Compiling Clinical Schema...</h4>
                <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                  Parsing structured registries, establishing severity parameters, and compiling discrepancy deltas.
                </p>
              </div>
            )}

            {hasAnalyzed && !isLoading && (
              <div className="space-y-4">
                {isFullyReconciled ? (
                  <div className="border border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/70 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-emerald-600 stroke-[3]" />
                    </div>
                    <h4 className="text-base font-extrabold text-emerald-900">
                      All clinical deltas resolved safely. Audit trail ready for permanent EHR export.
                    </h4>
                    <p className="text-xs text-emerald-600/90 mt-2 max-w-sm mx-auto leading-relaxed">
                      All {totalAuditItems} patient medication discrepancies have been cleared. All accepted overrides are formatted and ready to sync with the central EHR system.
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                      <button onClick={handleReset} className="px-3.5 py-1.5 bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-xs font-bold rounded-lg cursor-pointer transition-colors">
                        Restart Review
                      </button>
                      <button
                        onClick={() => alert('Simulating EHR Export! Action logged.')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Export EHR Audit Trail</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {discrepancies.map((discrepancy) => {
                      const isResolving = resolvingMeds.includes(discrepancy.drug_name);
                      const severityBorder = discrepancy.severity === 'HIGH' ? 'border-l-rose-500' : 'border-l-amber-500';

                      return (
                        <div
                          key={discrepancy.drug_name}
                          className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 border-l-4 ${severityBorder} hover:shadow-md transition-all duration-300 ease-in-out transform ${
                            isResolving ? 'scale-95 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-3 border-b border-slate-100 pb-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-extrabold text-slate-800">{discrepancy.drug_name}</span>
                                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200 rounded">
                                  {discrepancy.type.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                <span>AI Confidence Score: {discrepancy.confidence}%</span>
                                <div className="group relative ml-0.5 inline-block cursor-help">
                                  <HelpCircle className="w-3.5 h-3.5 text-slate-300 hover:text-slate-500" />
                                  <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded bg-slate-900 px-2 py-1.5 text-center text-[10px] font-normal leading-normal text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                                    Entity verified against structured vocabulary and context mapping.
                                    <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-slate-900" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border shrink-0 ${
                                discrepancy.severity === 'HIGH'
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {discrepancy.severity === 'HIGH' ? <Flame className="w-3 h-3 text-rose-500" /> : <AlertTriangle className="w-3 h-3 text-amber-500" />}
                              <span>{discrepancy.severity === 'HIGH' ? 'HIGH Risk' : 'MEDIUM Risk'}</span>
                            </span>
                          </div>

                          <p className="text-xs text-slate-800 leading-relaxed mb-4">{discrepancy.details}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs mb-4">
                            <div className="space-y-1">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Master EHR Record</span>
                              {discrepancy.master_record_value ? (
                                <code className="font-mono text-[11px] px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 inline-block mt-1 font-semibold">
                                  {discrepancy.master_record_value}
                                </code>
                              ) : (
                                <span className="text-slate-400 italic text-[11px] block mt-1">Not present in Master EHR</span>
                              )}
                            </div>
                            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Pharmacy Intake</span>
                              {discrepancy.intake_record_value ? (
                                <code className="font-mono text-[11px] px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200/80 font-bold inline-block mt-1">
                                  {discrepancy.intake_record_value}
                                </code>
                              ) : (
                                <span className="text-rose-600 font-semibold text-[11px] block mt-1">Omitted or Not Reported</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                            <button onClick={() => handleDismissAlert(discrepancy.drug_name)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer">
                              Dismiss
                            </button>
                            <button
                              onClick={() => handleAcceptOverride(discrepancy.drug_name)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept &amp; Override EHR</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-8 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4 text-xs text-slate-400">
          <p>Prototype mockup for portfolio demonstration. Built with React &amp; Tailwind CSS.</p>
          <p className="mt-1">Designed for safety-critical healthcare workflows with full clinician auditing capabilities.</p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN CASE STUDY COMPONENT
// =============================================================================
export default function MedicationReconcilerCaseStudy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* ===================================================================== */}
      {/* SECTION 1: NARRATIVE CASE STUDY CONTENT                               */}
      {/* ===================================================================== */}
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-16">

        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
          <Zap className="w-4 h-4" />
          <span>3-Day Rapid High-Fidelity Proto-Sprint</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Designing a High-Trust, Human-in-the-Loop AI Interface for Clinical Medication Reconciliation
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 my-8 border-y border-slate-200 text-sm">
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Role</p>
            <p className="font-medium text-slate-700 mt-1">Lead Product / UX Designer (End-to-End)</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Context</p>
            <p className="font-medium text-slate-700 mt-1">Digital Health Enterprise B2B Dashboard</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Timeline</p>
            <p className="font-medium text-slate-700 mt-1">3-Day Rapid High-Fidelity Proto-Sprint</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Core Mechanics</p>
            <p className="font-medium text-slate-700 mt-1">React, Tailwind CSS, Google AI Studio (Gemini)</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🔴 The Problem Space</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Clinicians spend hours manually reading messy, unstructured patient interview notes and trying to cross-reference them against rigid hospital Electronic Health Record (EHR) databases. This tedious process causes massive cognitive fatigue, data entry errors, and severe alert fatigue from ancient, cluttered hospital legacy software.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Furthermore, standard AI tooling often acts like a <strong className="text-slate-800">"black box,"</strong> forcing doctors to accept or reject computer decisions blindly with zero explanation, crushing user trust.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span>🎨 Key Product Design Decisions &amp; UX Mechanics</span>
          </h2>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <span>🧩 1. Multi-Dashboard Information Architecture (Split-Screen)</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">The Design Choice:</strong> A balanced, 2-column grid keeps the EHR Core Registry side-by-side with the AI-generated Reconciliation Deltas. <strong className="text-slate-700">Rationale:</strong> doctors never have to switch tabs or juggle windows to make a decision.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>📊 2. Macro-to-Micro Visual Hierarchy</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">The Design Choice:</strong> A Historical Metric Trends bar chart sits above the granular discrepancy cards, following Ben Shneiderman's "overview first, zoom and filter, then details-on-demand" rule.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>🎯 3. Designing for Trust: Explainable AI (XAI) Tokens</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">The Design Choice:</strong> Every flagged item shows its exact classification type and an AI Confidence Score. <strong className="text-slate-700">Rationale:</strong> users reject AI systems they don't understand, explicit transparency drives adoption.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>🎨 4. Data Diffing Patterns &amp; Alert Fatigue Mitigation</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">The Design Choice:</strong> Muted amber/rose severity tokens instead of blinding red alerts everywhere, with data variances shown side-by-side so doctors read the difference in under 3 seconds.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>🤝 5. Human-in-the-Loop (HITL) Safety Constraints</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">The Design Choice:</strong> The system never updates a patient's EHR autonomously, every discrepancy requires explicit human confirmation ("Dismiss" vs "Accept &amp; Override EHR"), keeping the clinician legally and clinically accountable.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>⚙️ How It Works in Production</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The live version of this tool (built and hosted in Google AI Studio) goes further than the mockup below, it calls the Gemini API directly for model-driven analysis, with a deterministic local engine as an automatic fallback.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-blue-600" />
                <span>4 Pre-Built Clinical Scenarios</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A standard adult polypharmacy case, a pediatric overdose safety scenario, a geriatric NSAID therapeutic-duplication case, and a fully-clean concordance case.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Live Gemini Reconciliation Engine</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The backend calls Gemini with a structured JSON schema and a strict "no hallucination" instruction: ambiguous mentions are flagged as <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">REQUIRES_HUMAN_CLARIFICATION</code> rather than guessed.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span>Deterministic Local Fallback</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If the Gemini models are overloaded or rate-limited, a rule-based clinical engine takes over automatically so the tool never goes down mid-review.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Multi-Format Clinical Export</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Results are viewable as a discrepancy list, a full roster comparison grid, raw JSON, or a formatted clinical markdown report.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>📉 Business &amp; Clinical Outcomes</span>
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-blue-600 font-bold">·</span>
              <span><strong className="text-slate-800">Cognitive Load:</strong> Reduced processing time by turning unstructured medical narrative into structured data comparisons.</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-blue-600 font-bold">·</span>
              <span><strong className="text-slate-800">System Trust:</strong> Increased transparency via clear confidence markers and explicit source data fields.</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-blue-600 font-bold">·</span>
              <span><strong className="text-slate-800">Error Minimization:</strong> Eliminated accidental drug cancellations by sorting omissions into clear visual checkpoints before records sync.</span>
            </li>
          </ul>
        </section>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Try the mockup below</p>
            <p className="text-xs text-slate-500 mt-1">Click through the exact flow shown in the screenshots, analyze, dismiss, and override.</p>
          </div>
          <a href="#sandbox" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-all shadow">
            <span>Try the Sandbox</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Note: this is a static portfolio mockup running fixed demo data, for the full Gemini-powered version with live scenario switching, see{' '}
          <a href="https://ai.studio/apps/bdf52703-5213-4951-a28b-aba5261d55be" target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">
            ai.studio/apps/bdf52703-5213-4951-a28b-aba5261d55be
          </a>.
        </p>
      </article>

      {/* ===================================================================== */}
      {/* SECTION 2: SANDBOX MOCKUP                                             */}
      {/* ===================================================================== */}
      <section id="sandbox" className="border-t border-slate-200">
        <ReconciliationSandbox />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: DETAIL-ORIENTED UI COLLAGE (intentional dark accent break)  */}
      {/* ===================================================================== */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="absolute inset-0 w-full h-full opacity-35 blur-[6px] scale-105 pointer-events-none select-none">
            <img src="/assets/images/full-dashboard-snapshot.png" alt="Full layout silhouette backdrop" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-8 left-6 sm:left-12 z-20 w-[240px] sm:w-[280px] transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 bg-[#0F172A] rounded-xl p-4 text-left select-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Verification Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tight">Pending Audit</span>
                <span className="text-sm font-black text-amber-500 font-mono">5</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tight">Accepted</span>
                <span className="text-sm font-black text-emerald-500 font-mono">0</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tight">Dismissed</span>
                <span className="text-sm font-black text-rose-500 font-mono">0</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-6 sm:right-12 z-30 w-[290px] sm:w-[350px] transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-slate-200 bg-white rounded-xl p-4 text-left select-none">
            <div className="flex justify-between items-start mb-2.5">
              <div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <span>Lisinopril</span>
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono font-medium tracking-wide">DOSAGE_MISMATCH</span>
                </h5>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>AI Confidence:</span>
                  <span className="text-slate-700 font-black">98%</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-black border bg-amber-50 text-amber-700 border-amber-100">MEDIUM RISK</span>
            </div>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 leading-relaxed">
              Dosage mismatch detected. The Master EHR prescribes Lisinopril 10mg once daily, but the patient reports taking Lisinopril 20mg once daily.
            </p>
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[8px] mb-0.5">Master Database</span>
                <div className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-slate-600">10mg once daily</div>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[8px] mb-0.5">Patient Intake</span>
                <div className="bg-rose-50 border border-rose-100 rounded px-2 py-0.5 font-bold font-mono text-rose-700">20mg once daily</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-40 bg-slate-900/90 border border-slate-800 text-[9px] font-mono tracking-widest font-black text-blue-400 px-2.5 py-1 rounded-md shadow-lg backdrop-blur-md">
            DETAILED UI MICRO-CROP COMPOSITION
          </div>
        </div>
      </div>
    </div>
  );
}