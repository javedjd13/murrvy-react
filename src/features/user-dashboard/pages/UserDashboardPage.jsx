import DashboardSidebar from "@/components/UserDashboard/DashboardSidebar";
import Layout5 from "@/components/Layout5";
import SaveAddressModal from "@/components/UserDashboard/SaveAddressModal";
import PaymentCardModal from "@/components/UserDashboard/PaymentCardModal";
import ProfileModal from "@/components/UserDashboard/ProfileModal";
import DeleteModal from "@/components/UserDashboard/DeleteModal";
import ConfirmDeleteModal from "@/components/UserDashboard/ConfirmDeleteModal";

const UserDashboardPage = () => {
  return (
    <Layout5>
      <DashboardSidebar />
      <SaveAddressModal />
      <PaymentCardModal />
      <ProfileModal />
      <DeleteModal />
      <ConfirmDeleteModal />
    </Layout5>
  );
};

export default UserDashboardPage;
