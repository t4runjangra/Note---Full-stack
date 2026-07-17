import { useState } from "react";
import API from "../api/axios";
import useAuth from "../context/AuthContext";
import EditProfileModal from "../components/EditProfileModal";
import { Camera, Image, Globe, MapPin, User, Mail, ShieldCheck, ShieldAlert, FileText, Share2, Star } from "lucide-react";
function Profile() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const initial = (user?.username || user?.email || "U").charAt(0).toUpperCase();
  const avatar = user?.avatar?.url;
  const coverAvatar = user?.coverAvatar?.url;

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  async function handleAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await API.patch("/auth/avatar", formData);
      setUser(response.data.data);
    } catch (error) {
      console.error("Avatar upload failed", error);
    } finally {
      setLoadingAvatar(false); // Fixed typo here
    }
  }

  async function handleCoverAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingCover(true);
      const formData = new FormData();
      formData.append("coverAvatar", file);
      const response = await API.patch("/auth/cover-avatar", formData);
      setUser(response.data.data);
    } catch (error) {
      console.error("Cover upload failed", error);
    } finally {
      setLoadingCover(false);
    }
  }
  const GithubIcon = ({ size = 16, className = "" }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const LinkedinIcon = ({ size = 16, className = "" }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  // 2. Use them inside your links grid like this:
  <span className="flex items-center gap-2 text-slate-500">
    <GithubIcon size={15} /> GitHub
  </span>
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full justify-start">

      <div className="rounded-4xl border border-slate-200 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-700">

          <label className="group relative block h-40 cursor-pointer sm:h-52 overflow-hidden bg-slate-950">
            {coverAvatar ? (
              <img src={coverAvatar} alt="Cover" className={`h-full w-full object-cover transition duration-300 ${loadingCover ? 'opacity-40 blur-xs' : 'group-hover:opacity-75'}`} />
            ) : (
              <div className="flex h-full items-center justify-center bg-linear-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-90" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md border border-white/20"><Image size={16} /><span>Change Cover Image</span></div>
            </div>
            {loadingCover && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs"><div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-white" /></div>}
            <input hidden type="file" accept="image/*" onChange={handleCoverAvatar} disabled={loadingCover} />
          </label>

          <div className="bg-white px-5 pb-6 pt-0 dark:bg-slate-900 sm:px-8">
            <div className="-mt-10 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <label className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-slate-100 text-3xl font-semibold text-slate-700 shadow-lg dark:border-slate-900 dark:bg-slate-800 dark:text-slate-100 sm:h-28 sm:w-28">
                  {avatar ? <img src={avatar} alt="Avatar" className={`h-full w-full object-cover transition ${loadingAvatar ? 'opacity-40' : 'group-hover:opacity-75'}`} /> : <span>{initial}</span>}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 transition group-hover:opacity-100"><Camera size={20} /><span className="text-[10px] mt-1 font-medium">Update</span></div>
                  {loadingAvatar && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40"><div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-white" /></div>}
                  <input hidden type="file" accept="image/*" onChange={handleAvatar} disabled={loadingAvatar} />
                </label>

                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.fullName || user?.username || "Your Name"}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Mail size={14} className="inline" />{user?.email || "your@email.com"}
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${user?.isEmailVerified ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`}>
                      {user?.isEmailVerified ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                      {user?.isEmailVerified ? "Verified" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>

              <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80 mb-2" onClick={() => setOpen(true)}>
                Edit Profile
              </button>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/60 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Bio</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{user?.bio || "No bio description added yet. Tell others something about yourself."}</p>
                </div>
                {user?.location && (
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
                    <MapPin size={14} className="text-slate-400" /><span>Based in {user.location}</span>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Connected Profiles</p>
                <div className="mt-5 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 dark:bg-slate-900 border border-slate-100 dark:border-transparent">
                    <span className="flex items-center gap-2 text-slate-500"><User size={15} /> Handle</span>
                    <span className="font-semibold text-slate-900 dark:text-white">@{user?.username || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 dark:bg-slate-900 border border-slate-100 dark:border-transparent">
                    <span className="flex items-center gap-2 text-slate-500"> 
                      <GithubIcon size={15} />
                      GitHub</span>
                    {user?.github ? <a href={user.github} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400">View Profile</a> : <span className="text-slate-400 dark:text-slate-600">—</span>}
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 dark:bg-slate-900 border border-slate-100 dark:border-transparent">
                    <span className="flex items-center gap-2 text-slate-500">
                      <LinkedinIcon size={15} />
                      LinkedIn</span>
                    {user?.linkedin ? <a href={user.linkedin} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Connect</a> : <span className="text-slate-400 dark:text-slate-600">—</span>}
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 dark:bg-slate-900 border border-slate-100 dark:border-transparent">
                    <span className="flex items-center gap-2 text-slate-500"><Globe size={15} /> Website</span>
                    {user?.website ? <a href={user.website} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400 truncate max-w-37.5">Visit Site</a> : <span className="text-slate-400 dark:text-slate-600">—</span>}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white/40 p-5 dark:border-slate-700/60 dark:bg-slate-900/40 backdrop-blur-xs flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl"><FileText size={22} /></div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Notes</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">12</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/40 p-5 dark:border-slate-700/60 dark:bg-slate-900/40 backdrop-blur-xs flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl"><Share2 size={22} /></div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Shared Notebooks</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">3</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/40 p-5 dark:border-slate-700/60 dark:bg-slate-900/40 backdrop-blur-xs flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl"><Star size={22} /></div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Favorites</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">5</p>
          </div>
        </div>
      </div>

      <EditProfileModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Profile;