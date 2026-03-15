import HeroSection from "./sections/HeroSection";
import StrategyFlow from "./sections/StrategyFlow";
import InterestForm from "./components/InterestForm";
import ScrollProgress from "./components/ScrollProgress";

function App() {

  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <StrategyFlow />
      <InterestForm />
    </>
  );

}

export default App;