import React, { forwardRef } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core';

import { ColorUtil } from '../../../utilities/ColorUtil';

const StyledByItemListItemIcon = styled(ListItemIcon)(({ theme, item }) => ({
    '& .MuiSvgIcon-root': {
        fill: ColorUtil.getItemColor(item ? item.color : null, theme),
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fill: theme.palette.text.primary,
    },
}));

export const FolderChildMenuItem = forwardRef(
    ({ item, onClick, text, Icon }, ref) => (
        <MenuItem onClick={onClick} ref={ref}>
            {item
                ? (
                    <StyledByItemListItemIcon item={item}>
                        <Icon />
                    </StyledByItemListItemIcon>
                )
                : (
                    <StyledListItemIcon>
                        <Icon />
                    </StyledListItemIcon>
                )
            }
            <ListItemText primary={text} />
        </MenuItem>
    )
);