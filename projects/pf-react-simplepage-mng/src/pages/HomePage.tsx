import { LoginForm, ProtectedRoute } from '../components';
import { useGetUserQuery } from '../services/authApi';
import { useAppSelector } from '../store/store';

const HomePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full flex justify-center items-center text-2xl"
      >
        Home
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
