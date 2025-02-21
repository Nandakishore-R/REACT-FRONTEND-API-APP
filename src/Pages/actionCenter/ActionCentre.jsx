import React from 'react'
import AppEntity from '../../components/actionCentre/AppEntity'
import Centre from '../../components/actionCentre/Centre'
import ThemeLayoutTwo from '../../common/ThemeLayoutTwo'
import './actionCenter.css'
import ActionCentreNewStyle from '../../components/actionCentre/newstylecomponents/ActionCentreNewStyle'

function ActionCentre() {
  return (
    <>
      <ThemeLayoutTwo>
        {/* <Centre /> */}
        <ActionCentreNewStyle />
      </ThemeLayoutTwo>

    </>

  )
}

export default ActionCentre