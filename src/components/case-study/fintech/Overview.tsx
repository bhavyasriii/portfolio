const Overview = () => {
  return (
    <section className="w-full px-6 md:px-12 py-20 bg-[#0B1220] text-white">
      <div className="max-w-5xl mx-auto">

        <p className="text-sm tracking-widest uppercase text-blue-400 mb-4">
          Overview
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
          A smarter way to understand spending and reduce unnecessary subscriptions
        </h2>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Managing personal finances today is overwhelming. Users often struggle to track 
          their spending habits, understand where their money goes, and identify unnecessary 
          subscriptions.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          This project explores how AI-driven insights can simplify financial awareness, 
          proactively highlight inefficiencies, and guide users toward smarter financial decisions 
          without requiring manual effort.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-sm text-gray-400">
          <div>
            <p className="text-white font-medium">Role</p>
            <p>UX Designer</p>
          </div>
          <div>
            <p className="text-white font-medium">Timeline</p>
            <p>2–3 Weeks</p>
          </div>
          <div>
            <p className="text-white font-medium">Platform</p>
            <p>Mobile App</p>
          </div>
          <div>
            <p className="text-white font-medium">Focus</p>
            <p>AI + Fintech UX</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Overview;