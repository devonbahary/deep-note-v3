import React from 'react';
import { colors } from './constants';
import { styled } from '@material-ui/core';

const GridDiv = styled('div')({
    display:'grid',
    gridTemplateColumns: '1fr 1fr',
    gridAutoRows: '7.5rem',
});

const ColorDiv = styled('div')(({ color }) => ({
    display: 'flex', 
    background: color, 
    justifyContent: 'center', 
    alignItems: 'center',
}));

export const Colors = () => {
    return (
        <GridDiv>
            {Object.entries(colors).map(([ name, color ]) => {
                return (
                    <ColorDiv key={name} color={color}>
                        {name}
                    </ColorDiv>
                );
            })}
        </GridDiv>
    );
};