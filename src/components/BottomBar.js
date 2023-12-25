import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export function BottomBar(props) {
  const { plan, updatePlanTimeframe } = props
  const planTimeframeOptions = {
    '1': 'All In 1 Year',
    '3:1': '3yr Plan - Year 1',
    '3:2': '3yr Plan - Year 2',
    '3:3': '3yr Plan - Year 3',
  }

  return (
    <div className='bottom-bar'>
      <FormControl>
        <Select
          value={plan}
          onChange={event => updatePlanTimeframe(event.target.value)}
          className='bottom-bar-select'
        >
          <MenuItem value="" disabled>Reading Plan</MenuItem>
          {Object.keys(planTimeframeOptions).map(x => <MenuItem key={x} value={x}>{planTimeframeOptions[x]}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}
