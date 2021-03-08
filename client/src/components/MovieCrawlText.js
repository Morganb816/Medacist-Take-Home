import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import React, { useEffect, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        height: '25vh',
        perspective: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.common.black,
    },
    innerContainer: {
        width: '50%',
        transform: 'rotateX(25deg)',
        position: 'relative'
    },
    text: {
        position: 'relative',
        fontWeight: theme.typography.fontWeightBold,
        color: yellow[300]
    }
}))

const MovieCrawlText = ({children}) => {

    const styles = useStyles();

    const interval = useRef(null);
    const basePos = useRef(null);
    const pos = useRef(null);

    const outerContainerRef = useRef(null);
    const innerContainerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!children || !outerContainerRef.current || !textRef.current) {
            return;
        } 

        const outerOffsetHeight = outerContainerRef.current.offsetHeight;
        const textOffsetHeight = textRef.current.offsetHeight;
        const scrollHeight = outerOffsetHeight + textOffsetHeight * 2;

        innerContainerRef.current.style.height = `${scrollHeight}px`;
        basePos.current = scrollHeight - textOffsetHeight + 50;
        textRef.current.style.top = `${basePos.current}px`;
        pos.current = basePos.current;

        if (!interval.current) {
            interval.current = setInterval(() => {
                textRef.current.style.top = `${pos.current}px`;
                if (pos.current <= (0 - 50)) {
                    pos.current = basePos.current + 50;
                } else {
                    pos.current--;
                    console.log(pos);
                }
            }, 15)
        }
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [children])

    return (
        <Box p={1}>
            <Card elevation={3} ref={outerContainerRef} className={styles.outerContainer}>
                <Box ref={innerContainerRef} className={styles.innerContainer}>
                    <Typography ref={textRef} variant='body1' className={styles.text}>
                        {children}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
};

export default MovieCrawlText;