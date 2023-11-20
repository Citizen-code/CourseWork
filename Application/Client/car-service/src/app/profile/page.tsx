import Header from "@/components/profile/header";
import TabControl from "@/components/profile/tab_control";
import ProfileContext from "@/components/profile/context";

export default async function Profile() {
    return (
        <ProfileContext>
            <div>
                <Header />
                <TabControl/>
            </div>
        </ProfileContext>

    )
}