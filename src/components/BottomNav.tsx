import React, { useContext, useEffect, useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Restore, Favorite, LocationOn, Add, Close as CloseIcon} from '@material-ui/icons';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export enum NavIndex {
  Left, 
  Right,
  Middle
}

type BottomNavProps = {
  selectedIndex: NavIndex,
  onChange: (current: NavIndex, prev: NavIndex) => void
}

const NAV_LEFT_ACTION_LABEL = 'All'
const NAV_MIDDLE_ACTION_LABEL = 'Journal'
const NAV_RIGHT_ACTION_LABEL = 'Graph'

const BOTTOM_NAV_HEIGHT = 56;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: BOTTOM_NAV_HEIGHT
    },
  }),
);

export const BottomNav = ({ selectedIndex, onChange }: BottomNavProps ) => {
  // const classes = useStyles()

  const [navIndex, setNavIndex] = useState(selectedIndex)

  const handleChange = (e: any, v: any) => {
    console.log("BottomNav:", e, v)
    onChange(v, navIndex)
    setNavIndex(v as NavIndex)
  }

  return (
    <BottomNavigation value={navIndex} onChange={handleChange} showLabels >
      <BottomNavigationAction value={NavIndex.Left} label={NAV_LEFT_ACTION_LABEL} icon={<Restore />} />
      <BottomNavigationAction value={NavIndex.Middle} label={NAV_MIDDLE_ACTION_LABEL} icon={<Favorite />} />
      <BottomNavigationAction value={NavIndex.Right} label={NAV_RIGHT_ACTION_LABEL} icon={<LocationOn />} />
    </BottomNavigation>
  )
}
