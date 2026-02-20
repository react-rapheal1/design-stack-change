import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Users01 } from "@untitledui/icons";

export default function RemoteEmployeesHome() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#fcfcfd] p-8">
            <FeaturedIcon icon={Users01} color="brand" theme="light" size="xl" />
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-primary">Remote Employees Portal</h1>
                <p className="mt-2 text-secondary">Coming soon</p>
            </div>
            <Button href="/" color="secondary">
                Back to Home
            </Button>
        </div>
    );
}
