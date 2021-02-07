import { Box } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { useContext } from "react"
import { MemoContext } from "../context/MemoContextProvider"
import { MemoCard } from "./MemoCard"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      boxSizing: 'border-box',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr) )",
      gap: theme.spacing(3),
    },
  })
)
export const GridContentView = () => {
  const classes = useStyles()
  const { memos } = useContext(MemoContext)

  const drawCards = () => {
    if(memos.length <= 0) {
      return <div>No memos available</div>
    }
    return memos.map(memo => {
        return <MemoCard key={memo.id} memo={memo}></MemoCard>
    })
  }

  return (
    <div className={classes.grid}>
      {drawCards()}
    </div>
  )
}