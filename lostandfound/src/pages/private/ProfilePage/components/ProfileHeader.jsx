import edit from "../../../../assets/images/edit-text.png"

function ProfileHeader({avatar, full_name, collage_name}) {

    return (
        <div className="w-full flex px-52 gap-8">
            <img src={avatar} alt="" className="rounded-full size-32"/>
            <div className="flex flex-col gap-4">
                <div> 
                <p className="font-bold text-2xl text-white">{full_name}</p>
                <p className="text-[#9ca3af]">{collage_name}</p>
                </div>
               <button className="bg-black text-white flex gap-2 h-8 w-40 items-center p-5 rounded-xl"><img src={edit} alt="" className="size-5 object-cover"/>Edit Profile</button>
            </div>
        </div>
    );
}

export default ProfileHeader;