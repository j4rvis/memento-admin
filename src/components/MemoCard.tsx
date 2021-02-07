import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { Memo, Tag } from "../models/Models"

type ViewProps = {
  memo: Memo,
  handleReferenceMemoClick?: (memo: Memo) => void,
  handleTagClick?: (tag: Tag) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        // width: 300,
        // height: 200
      },
      cardContent: {
        height: 120,
        overflowY: "auto",
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      chipList: {
        display: 'flex',
        flexWrap: 'nowrap',
        listStyle: 'none',
        margin: 0,
        overflowX: "auto",
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      chip: {
        margin: theme.spacing(0.5),
      },
    })
  )

export const MemoCard = ({memo}: ViewProps) => {
    const classes = useStyles()
    
  const drawTagChips = (tags: Tag[]) => {
    const chips = tags.map(tag => {
      return (
        <Chip
          key={tag.id}
          className={classes.chip}
          size="small"
          label={tag.name}
          color='primary'
        ></Chip>
      )
    })
    return (
      <Box className={classes.chipList}>
        {chips}
      </Box>
    )
  }
  return (
    <Card className={classes.card} key={memo.id}>
      <CardContent>
        <Typography className={classes.cardContent} variant='body1'>{memo.text}</Typography>
        {drawTagChips(memo.tags)}
      </CardContent>
      <CardActionArea>
      </CardActionArea>
    </Card>
  )
}