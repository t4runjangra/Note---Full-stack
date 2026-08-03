import {
    ShieldCheck,
    NotebookPen,
    Search,
    Archive,
    Trash2,
    Pin,
    MoonStar,
    Smartphone,
    RefreshCcw,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Secure Authentication",
        description:
            "JWT authentication with refresh token rotation, password reset and protected routes keep your account secure.",
    },
    {
        icon: NotebookPen,
        title: "Powerful Note Management",
        description:
            "Create, edit, organize, archive and restore notes effortlessly from any device.",
    },
    {
        icon: Search,
        title: "Instant Search",
        description:
            "Quickly find notes using fast text search, sorting and pagination.",
    },
    {
        icon: Pin,
        title: "Pin Important Notes",
        description:
            "Keep your most important notes at the top for instant access.",
    },
    {
        icon: Archive,
        title: "Archive Workspace",
        description:
            "Hide notes without deleting them and restore them whenever needed.",
    },
    {
        icon: Trash2,
        title: "Trash & Recovery",
        description:
            "Soft delete notes safely with restore support before permanent deletion.",
    },
    {
        icon: MoonStar,
        title: "Dark Mode",
        description:
            "Comfortable experience during both day and night with elegant dark mode.",
    },
    {
        icon: Smartphone,
        title: "Responsive Design",
        description:
            "Optimized for desktop, tablet and mobile devices with a consistent experience.",
    },
    {
        icon: RefreshCcw,
        title: "Cloud Sync",
        description:
            "Every note is securely stored in MongoDB and available whenever you log in.",
    },
];

function FeatureSection() {
    return (
        <section
            id="features"
            className="mx-auto max-w-7xl px-6 py-24"
        >
            <div className="text-center">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                    Features
                </span>

                <h2 className="mt-6 text-4xl font-bold text-white">
                    Everything you need to stay organized
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                    Built with security, speed and productivity in mind. Your
                    notes remain accessible, searchable and protected wherever
                    you are.
                </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {features.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/90"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
                            <Icon size={26} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold text-white">
                            {title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-400">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeatureSection;