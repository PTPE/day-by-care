import AccountInformation from '@/features/auth/components/account-information';
import AccountSecurity from '@/features/auth/components/account-sercurity';
import Logout from '@/features/auth/components/logout';

export default function SettingPage() {
  return (
    <div className="space-y-5">
      <AccountInformation />
      <AccountSecurity />
      <Logout />
    </div>
  );
}
