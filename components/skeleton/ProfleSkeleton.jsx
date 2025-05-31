import { LogOut, ChevronRight } from "lucide-react";

const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-sm p-4 rounded-xl shadow-md bg-white border">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
          <span className="material-icons">person</span>
        </div>
        <h2 className="mt-2 text-lg font-semibold">Md Tanjil</h2>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm text-gray-600 font-medium mb-1">
          Account Information
        </h3>
        <div className="text-sm text-gray-800">Name: Md Tanjil</div>
        <div className="text-sm text-gray-800">
          Email: tanjil4work@gmail.com
        </div>
        <div className="text-sm text-gray-800">Phone: +8801911845142</div>
      </div>

      <div className="mt-6 space-y-2">
        {["My orders", "Edit Profile", "Add/Edit Address", "Admin panel"].map(
          (label, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between text-sm px-3 py-2 rounded-md border hover:bg-gray-50 transition"
            >
              {label}
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          )
        )}

        <button className="w-full flex items-center justify-between text-sm px-3 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition">
          Logout
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
