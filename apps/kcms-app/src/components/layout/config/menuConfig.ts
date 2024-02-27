import { MainNavItem, SidebarNavItem } from "../../../types";

interface MenuConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const menuConfig: MenuConfig = {
  mainNav: [
    {
      title: 'AI 对话',
      href: '/chat',
    },
    {
      title: '知识库管理',
      href: '/knowledge',
    },
    {
        title: '测试页面',
        href: '/test',
    }
  ],
  sidebarNav: [
    {
      title: '快速开始',
      items: [
        {
          title: '对话',
          href: '/chat',
          items: [],
        },
        {
          title: '知识库管理',
          href: '/knowledge',
          items: [],
        }
      ],
    },
  ],
};
