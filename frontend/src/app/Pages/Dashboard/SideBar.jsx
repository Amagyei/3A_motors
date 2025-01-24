import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../../../assets/images/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

// Styled Components
const SidebarContainer = styled.div`
  ${tw`
    w-72
    h-full
    fixed
    bg-white
    dark:bg-secondary-dark-bg 
    overflow-auto
    pb-10
  `};
`;

const SidebarContent = styled.div`
  ${tw`
    flex
    justify-between
    items-center
    px-4
    py-2
  `};
`;

const SidebarTitle = styled(Link)`
  ${tw`
    flex
    items-center
    text-blue-500
    text-xl
    hover:text-blue-700
  `};
`;

const SidebarSection = styled.div`
  ${tw`
    mt-4
  `};
`;

const SectionTitle = styled.p`
  ${tw`
    text-gray-400
    m-3
    mt-4
    uppercase
  `};
`;

const SidebarLink = styled(NavLink)`
  ${tw`
    flex
    items-center
    text-gray-700
    p-2
    rounded-lg
    hover:bg-light-gray
    dark:hover:bg-main-dark-bg
    capitalize
    gap-4
    no-underline
    hover:text-black
    w-full
  `};

  &.active {
    ${tw`
      text-white
      bg-blue-500
    `};
  }
`;

const HiddenSidebarContainer = styled.div`
  ${tw`
    w-0
    bg-main-dark-bg
    dark:bg-main-dark-bg
  `};
`;

// Component
export default function SideBar() {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <>
      {activeMenu ? (
        <SidebarContainer className="sidebar">
          <SidebarContent>
            <SidebarTitle to="/" onClick={handleCloseSideBar}>
              <SiShopware className="text-4xl" />
              <span className="ml-2">Shoppy</span>
            </SidebarTitle>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-2 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </SidebarContent>

          <SidebarSection>
            {links.map((section) => (
              <div key={section.title}>
                <SectionTitle>{section.title}</SectionTitle>
                {section.links.map((link) => (
                  <SidebarLink
                    to={`/dashboard/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </SidebarLink>
                ))}
              </div>
            ))}
          </SidebarSection>
        </SidebarContainer>
      ) : (
        <HiddenSidebarContainer />
      )}
    </>
  );
}
