import { useState, useEffect } from "react";
import API from "../api/axios";
import useAuth from "../context/AuthContext";

function EditProfileModal({ open, onClose }) {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        github: "",
        linkedin: "",
        website: "",
        location: "",
    });

    useEffect(() => {
        if (open && user) {
            setFormData({
                fullName: user.fullName || "",
                bio: user.bio || "",
                github: user.github || "",
                linkedin: user.linkedin || "",
                website: user.website || "",
                location: user.location || "",
            });
        }
    }, [open, user]);


    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await API.patch("/auth/update-profile", formData);
            setUser(response.data.data);
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center h-screen justify-center bg-black/60 p-4 backdrop-blur-md ">
            
            <div className="flex w-full max-w-xl max-h-[85vh] flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">
                        Edit Profile
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />


                        <Input
                            label="Bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />

                        <Input
                            label="GitHub"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                        />

                        <Input
                            label="LinkedIn"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                        />

                        <Input
                            label="Website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />

                        <Input
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-3 p-5 border-t border-slate-800 bg-slate-900/50 rounded-b-3xl">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-700 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 shadow-sm shadow-blue-600/20"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="mb-2 block text-xs font-medium text-slate-400 uppercase tracking-wider">
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
}

export default EditProfileModal;