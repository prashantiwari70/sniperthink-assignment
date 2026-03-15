import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

function InterestForm() {

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Listen for "I'm Interested" button click
  useEffect(() => {

    const handler = (e) => {
      setStep(e.detail);
      setOpen(true);
      setMessage("");
      setName("");
      setEmail("");
    };

    window.addEventListener("openInterestForm", handler);

    return () => window.removeEventListener("openInterestForm", handler);

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      await axios.post("http://localhost:5000/api/interest", {
        name,
        email,
        step
      });

      setMessage("Interest submitted successfully!");

    } catch (error) {

      setMessage("Something went wrong.");

    }

    setLoading(false);
  };

  if (!open) return null;

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >

        <h2 className="text-xl font-semibold mb-4 text-white">
          I'm Interested in Step {step}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded bg-gray-800 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 py-2 rounded text-white"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

        </form>

        {message && (
          <p className="text-green-400 mt-3">{message}</p>
        )}

        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 mt-4 hover:text-white"
        >
          Close
        </button>

      </motion.div>

    </motion.div>
  );
}

export default InterestForm;