import { useState } from "react";
import StrategyCard from "../components/StrategyCard";
import InterestForm from "../components/InterestForm";
import { strategySteps } from "../data/strategySteps";

function StrategySection() {

  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <section className="min-h-screen bg-black text-white p-10">

      <h2 className="text-4xl font-bold text-center mb-12">
        How SniperThink Works
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {strategySteps.map((step) => (
          <StrategyCard
            key={step.id}
            step={step}
            onInterested={() => setSelectedStep(step.title)}
          />
        ))}
      </div>

      {selectedStep && (
        <InterestForm
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
        />
      )}

    </section>
  );
}

export default StrategySection;