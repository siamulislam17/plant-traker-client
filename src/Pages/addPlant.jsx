// AddPlant.jsx
import React, { useContext, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  Sprout,
  Image as ImageIcon,
  Droplets,
  Calendar,
  Mail,
  User as UserIcon,
  Info,
} from "lucide-react";

import AuthContext from "../Authentication With FireBase/AuthContext";

// Tiny helper to concatenate class names
const cx = (...c) => c.filter(Boolean).join(" ");

const Input = ({ label, icon: Icon, className = "", darkMode, ...props }) => (
  <label className="group block">
    <span
      className={cx(
        "mb-1.5 inline-flex items-center gap-2 text-sm font-medium",
        darkMode ? "text-zinc-200" : "text-zinc-700"
      )}
    >
      {Icon && <Icon size={16} aria-hidden="true" />} {label}
    </span>
    <input
      className={cx(
        "w-full rounded-xl border p-2 shadow-sm transition-all",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
        darkMode
          ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400"
          : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500",
        className
      )}
      {...props}
    />
  </label>
);

const Select = ({ label, icon: Icon, children, className = "", darkMode, ...props }) => (
  <label className="group block">
    <span
      className={cx(
        "mb-1.5 inline-flex items-center gap-2 text-sm font-medium",
        darkMode ? "text-zinc-200" : "text-zinc-700"
      )}
    >
      {Icon && <Icon size={16} aria-hidden="true" />} {label}
    </span>
    <select
      className={cx(
        "w-full rounded-xl border p-2 shadow-sm transition-all",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
        darkMode
          ? "bg-zinc-900 border-zinc-700 text-zinc-100"
          : "bg-white border-zinc-300 text-zinc-900",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </label>
);

const Textarea = ({ label, icon: Icon, className = "", darkMode, ...props }) => (
  <label className="group block md:col-span-2">
    <span
      className={cx(
        "mb-1.5 inline-flex items-center gap-2 text-sm font-medium",
        darkMode ? "text-zinc-200" : "text-zinc-700"
      )}
    >
      {Icon && <Icon size={16} aria-hidden="true" />} {label}
    </span>
    <textarea
      className={cx(
        "w-full rounded-xl border shadow-sm transition-all",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
        darkMode
          ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400"
          : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500",
        className
      )}
      {...props}
    />
  </label>
);

const SubmitButton = ({ loading, darkMode }) => (
  <button
    type="submit"
    disabled={loading}
    className={cx(
      "w-full rounded-xl text-white font-semibold tracking-wide transition-transform",
      "hover:scale-[1.01] active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed",
      darkMode ? "bg-emerald-500 hover:bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"
    )}
  >
    {loading ? "Adding..." : "Add Plant"}
  </button>
);

const AddPlant = () => {
  const { darkMode } = useContext(AuthContext) || { darkMode: false };

  const [loading, setLoading] = useState(false);
  const [lastWatered, setLastWatered] = useState("");

  const containerBg = useMemo(
    () => (darkMode ? "bg-zinc-950" : "bg-gray-100"),
    [darkMode]
  );

  const cardClass = useMemo(
    () =>
      darkMode
        ? "rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur"
        : "rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg",
    [darkMode]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Guard: nextWatering >= lastWatered
    if (data.lastWatered && data.nextWatering && data.nextWatering < data.lastWatered) {
      Swal.fire({
        icon: "warning",
        title: "Check the dates",
        text: "Next watering date can't be earlier than the last watered date.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://plant-traker-server.vercel.app/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed with ${res.status}`);
      }

      const json = await res.json();
      if (json?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Plant added",
          text: "Your plant was added successfully!",
          confirmButtonColor: "#16a34a",
        });
        e.currentTarget.reset();
        setLastWatered("");
      } else {
        Swal.fire({
          icon: "info",
          title: "Saved",
          text: "Submitted, but the server didn't return an ID. Double-check the list.",
          confirmButtonColor: "#16a34a",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // No reliance on `.dark` or `data-theme` anymore.
    // Everything is explicitly styled based on `darkMode`.
    <div className={cx("min-h-screen px-4 py-10 sm:py-14 md:py-16", containerBg)}>
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div
            className={cx(
              "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg",
              darkMode ? "bg-emerald-500" : "bg-emerald-600"
            )}
          >
            <Sprout size={22} />
          </div>
          <h2 className={cx("text-3xl font-extrabold tracking-tight", darkMode ? "text-zinc-50" : "text-zinc-900")}>
            Add a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              New Plant
            </span>
          </h2>
          <p className={cx("mt-2 text-sm", darkMode ? "text-zinc-300" : "text-zinc-600")}>
            Track care, watering, and health with a crisp, accessible form.
          </p>
        </div>

        {/* Card */}
        <div className={cardClass}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
            <Input
              label="Image URL"
              name="image"
              type="url"
              placeholder="https://..."
              required
              icon={ImageIcon}
              darkMode={darkMode}
            />

            <Input
              label="Plant Name"
              name="name"
              type="text"
              placeholder="e.g. Snake Plant"
              required
              icon={Sprout}
              darkMode={darkMode}
            />

            <Select label="Category" name="category" required icon={Info} defaultValue="" darkMode={darkMode}>
              <option value="" disabled>
                Select category
              </option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
            </Select>

            <Select label="Care Level" name="careLevel" required icon={Droplets} defaultValue="" darkMode={darkMode}>
              <option value="" disabled>
                Select care level
              </option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </Select>

            <Input
              label="Watering Frequency"
              name="wateringFrequency"
              type="text"
              placeholder="e.g. every 3 days"
              required
              icon={Droplets}
              darkMode={darkMode}
            />

            <Input
              label="Health Status"
              name="healthStatus"
              type="text"
              placeholder="e.g. Healthy, Wilting"
              required
              icon={Info}
              darkMode={darkMode}
            />

            <Input
              label="Last Watered Date"
              name="lastWatered"
              type="date"
              required
              icon={Calendar}
              value={lastWatered}
              onChange={(e) => setLastWatered(e.target.value)}
              darkMode={darkMode}
            />

            <Input
              label="Next Watering Date"
              name="nextWatering"
              type="date"
              required
              icon={Calendar}
              min={lastWatered || undefined}
              darkMode={darkMode}
            />

            <Input
              label="User Email"
              name="userEmail"
              type="email"
              placeholder="you@example.com"
              required
              icon={Mail}
              darkMode={darkMode}
            />

            <Input
              label="User Name"
              name="userName"
              type="text"
              placeholder="Your name"
              required
              icon={UserIcon}
              darkMode={darkMode}
            />

            <Textarea
              label="Description"
              name="description"
              placeholder="Brief description about the plant..."
              required
              rows={4}
              icon={Info}
              darkMode={darkMode}
            />

            <div className="md:col-span-2">
              <SubmitButton loading={loading} darkMode={darkMode} />
            </div>

            <p className={cx("md:col-span-2 text-xs", darkMode ? "text-zinc-400" : "text-zinc-500")}>
              Your data is sent securely. Make sure dates are accurate so reminders line up with your care plan.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
