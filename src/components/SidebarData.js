import React from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        title: "利用者を管理する",
        icon: <PersonAddAltIcon/>,
        link: "/usermanagement",
    },
    {
        title: "物品を管理する",
        icon: <InventoryIcon/>,
        link: "/itemmanagement",
    },
    {
        title: "Q&Aを管理する",
        icon: <QuestionAnswerIcon/>,
        link: "/qamanagement",
    },
    {
        title: "ログアウト",
        icon: <LogoutIcon/>,
        link: "/",
    },

];

