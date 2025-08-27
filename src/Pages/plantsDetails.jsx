
import React, { useContext, useMemo } from "react";
import { useLoaderData, Link } from "react-router"; 
import { Sprout, Droplets, Info, Calendar, ArrowLeft } from "lucide-react";
import AuthContext from "../Authentication With FireBase/AuthContext";

// small className helper
const cx = (...c) => c.filter(Boolean).join(" ");

// safe date formatter
const fmtDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d) ? String(value) : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const Badge = ({ children, dark }) => (
  <span
    className={cx(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
      dark ? "bg-emerald-900/40 text-emerald-300 ring-emerald-800" : "bg-emerald-50 text-emerald-700 ring-emerald-200"
    )}
  >
    {children}
  </span>
);

const Field = ({ icon: Icon, label, children, dark }) => (
  <div className="flex items-start gap-3">
    <div
      className={cx(
        "mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg ring-1",
        dark ? "bg-zinc-900 ring-zinc-800 text-zinc-300" : "bg-zinc-50 ring-zinc-200 text-zinc-600"
      )}
      aria-hidden="true"
    >
      <Icon size={16} />
    </div>
    <div>
      <div className={cx("text-xs font-semibold uppercase tracking-wide", dark ? "text-zinc-400" : "text-zinc-500")}>
        {label}
      </div>
      <div className={cx("mt-0.5 text-sm", dark ? "text-zinc-100" : "text-zinc-800")}>{children}</div>
    </div>
  </div>
);

const PlantDetails = () => {
  const plant = useLoaderData() || {};
  const { darkMode } = useContext(AuthContext) || { darkMode: false };

  // derive UI helpers
  const containerBg = useMemo(() => (darkMode ? "bg-zinc-950" : "bg-gray-100"), [darkMode]);
  const cardClass = useMemo(
    () =>
      darkMode
        ? "rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur"
        : "rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg",
    [darkMode]
  );

  const textMain = darkMode ? "text-zinc-50" : "text-zinc-900";
  const textSub = darkMode ? "text-zinc-300" : "text-zinc-600";

  // fallback image
  const onImgError = (e) => {
    e.currentTarget.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>
          <rect width='100%' height='100%' fill='#e5e7eb'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='18'>No Image</text>
        </svg>`
      );
  };

  // If loader didn’t find a plant, show an empty state
  if (!plant || !plant._id) {
    return (
      <div className={cx("min-h-screen flex items-center justify-center px-4 py-16", containerBg)}>
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white",
                darkMode ? "bg-emerald-500" : "bg-emerald-600"
              )}
            >
              <Sprout size={20} />
            </div>
            <div>
              <h2 className={cx("text-xl font-bold", textMain)}>Plant not found</h2>
              <p className={cx("text-sm", textSub)}>The plant you’re looking for doesn’t exist or was removed.</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/plants"
              className={cx(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ring-1",
                darkMode
                  ? "ring-zinc-700 text-zinc-100 hover:bg-zinc-800"
                  : "ring-zinc-300 text-zinc-800 hover:bg-zinc-100"
              )}
            >
              <ArrowLeft size={16} /> Back to All Plants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("min-h-screen flex items-center justify-center px-4 py-16", containerBg)}>
      <div className={cx("w-full max-w-3xl", cardClass)}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className={cx(
              "inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg",
              darkMode ? "bg-emerald-500" : "bg-emerald-600"
            )}
          >
            <Sprout size={22} />
          </div>
          <div>
            <h2 className={cx("text-2xl font-extrabold tracking-tight", textMain)}>{plant.name || "Unnamed Plant"}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {plant.category ? <Badge dark={darkMode}>{plant.category}</Badge> : null}
              {plant.careLevel ? <Badge dark={darkMode}>{plant.careLevel}</Badge> : null}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mt-5 overflow-hidden rounded-xl">
          <img
            src={plant.image}
            alt={plant.name || "plant"}
            className="h-64 w-full object-cover"
            loading="lazy"
            onError={onImgError}
          />
        </div>

        {/* Details grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field icon={Info} label="Category" dark={darkMode}>
            {plant.category || "—"}
          </Field>
          <Field icon={Droplets} label="Care Level" dark={darkMode}>
            {plant.careLevel || "—"}
          </Field>
          <Field icon={Droplets} label="Watering Frequency" dark={darkMode}>
            {plant.wateringFrequency || "—"}
          </Field>
          <Field icon={Info} label="Health Status" dark={darkMode}>
            {plant.healthStatus || "—"}
          </Field>
          <Field icon={Calendar} label="Last Watered" dark={darkMode}>
            {fmtDate(plant.lastWatered)}
          </Field>
          <Field icon={Calendar} label="Next Watering" dark={darkMode}>
            {fmtDate(plant.nextWatering)}
          </Field>
        </div>

        {/* Description */}
        <div className="mt-6">
          <div className={cx("text-xs font-semibold uppercase tracking-wide", darkMode ? "text-zinc-400" : "text-zinc-500")}>
            Description
          </div>
          <p className={cx("mt-1 text-sm leading-6", darkMode ? "text-zinc-100" : "text-zinc-800")}>
            {plant.description || "—"}
          </p>
        </div>

        {/* Footer meta + back */}
        <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between
          border-zinc-200 dark:border-zinc-800">
          <p className={cx("text-xs", textSub)}>
            Added by: <span className={cx(darkMode ? "text-zinc-100" : "text-zinc-900")}>{plant.userName || "Unknown"}</span>
            {" "}
            ({plant.userEmail || "no email"})
          </p>

          <Link
            to="/plants"
            className={cx(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ring-1",
              darkMode
                ? "ring-zinc-700 text-zinc-100 hover:bg-zinc-800"
                : "ring-zinc-300 text-zinc-800 hover:bg-zinc-100"
            )}
          >
            <ArrowLeft size={16} /> Back to All Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
