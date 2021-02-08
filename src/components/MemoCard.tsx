import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { Memo, Tag } from "../models/Models"

type ViewProps = {
  memo: Memo,
  handleClick: (memo: Memo) => void,
  handleReferenceMemoClick?: (memo: Memo) => void,
  handleTagClick?: (tag: Tag) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        borderRadius: theme.spacing(3),
        padding: theme.spacing(2)
      },
      cardContent: {
        height: 100,
        overflowY: "auto",
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      chipList: {
        paddingTop: theme.spacing(1),
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

export const MemoCard = ({memo, handleClick}: ViewProps) => {
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
      <CardActionArea onClick={() => handleClick(memo)}>
        <Typography className={classes.cardContent} variant='body1'>{memo.text}</Typography>
      </CardActionArea>
      {drawTagChips(memo.tags)}
    </Card>
  )
}