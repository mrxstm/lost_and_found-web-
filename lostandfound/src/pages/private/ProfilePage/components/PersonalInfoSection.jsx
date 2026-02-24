import InfoField from "./InfoField";


function PersonalInfoSection() {
    return (
        <div className="bg-[#1F2937] h-[450px] mt-20 w-full rounded-3xl p-10"> 
            <h1 className="text-2xl text-white font-semibold">Personal Information</h1>
            <div className="flex flex-col gap-6 items-center mt-8 ml-10">
                <div className="flex gap-20">
                    <InfoField
                    label="Full name"
                    value="Satyam Shrestha"
                    htmlfor="fullname"
                    />
                    <InfoField
                    label="Email"
                    value="stmm12@gmai.com"
                    htmlfor="email"
                    />
                </div>

                <div className="flex gap-20">
                    <InfoField
                    label="Phone Number"
                    value="9840874455"
                    htmlfor="phone_no."/>

                    <InfoField
                    label="Gender"
                    value="male"
                    htmlfor="gender"/>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoSection;