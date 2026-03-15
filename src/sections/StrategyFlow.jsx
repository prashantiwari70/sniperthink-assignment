import StrategyCard from "../components/StrategyCard";
import { strategySteps } from "../data/strategySteps";

function StrategyFlow() {

  return (

    <section className="bg-black text-white py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          How SniperThink Works
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {strategySteps.map((step) => (
            <StrategyCard key={step.id} step={step}/>
          ))}

        </div>

      </div>

    </section>

  );
}

export default StrategyFlow;