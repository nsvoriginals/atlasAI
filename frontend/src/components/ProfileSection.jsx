export function ProfileSection() {
    return (
      <div className="w-full px-8 pb-8">
        <h2 className="my-6 text-lg tracking-widest uppercase">Your personal info</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              name="basics.name"
              placeholder="John Smith"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="basics.email"
              placeholder="johnsmith@gmail.com"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <input
              name="basics.phone"
              placeholder="(555) 464-6446"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              name="basics.location.address"
              placeholder="Seattle, WA"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              name="basics.website"
              placeholder="mycoolportifolio.com/myname"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    )
  }