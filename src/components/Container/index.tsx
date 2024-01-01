import { ReactNode } from 'react';
import NavBar from '#components/NavBar';
import Topbar from '#components/Topbar';
import './index.css';
interface ContainerProps {
  children: ReactNode;
}
const Container = ({ children,
}: ContainerProps) => {
  return (
    <>
      <div className="main">
        <div className="nav"><NavBar title={'Admin-Panel'} /></div>
        <div className="wrapper">
          <div className="topbar"><Topbar /></div>
          <div className="container">
            {children}

          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
