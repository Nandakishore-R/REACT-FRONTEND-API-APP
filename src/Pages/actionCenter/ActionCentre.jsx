import React from 'react'
import AppEntity from '../../components/actionCentre/AppEntity'
import Centre from '../../components/actionCentre/Centre'
import ThemeLayoutTwo from '../../common/ThemeLayoutTwo'
import './actionCenter.css'
import ActionCentreNewStyle from '../../components/actionCentre/newstylecomponents/ActionCentreNewStyle'
import Header from '../../common/Header'
import LeftPanel from '../../common/LeftPanel'

function ActionCentre() {
  return (
    <>
      <LeftPanel />
      <ThemeLayoutTwo>
        <div className='panel-header'>
          <Header/>
        </div>
        {/* <Centre /> */}
        <ActionCentreNewStyle />
      </ThemeLayoutTwo>

    </>

  )
}

export default ActionCentre