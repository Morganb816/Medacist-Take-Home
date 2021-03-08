import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
        transform: 'rotateX(50deg)',
        position: 'relative'
    },
    text: {
        position: 'relative',
        fontWeight: theme.typography.fontWeightBold,
        color: yellow[300],
        textAlign: 'center',
    }
}))

/**
 * @name MovieCrawlText
 * @description Component to show crawl text like the opening of the movies.
 * @component
 */
const MovieCrawlText = ({text, title, episodeId}) => {

    const styles = useStyles();

    const interval = useRef(null);
    const basePos = useRef(null);
    const pos = useRef(null);

    const outerContainerRef = useRef(null);
    const innerContainerRef = useRef(null);
    const textRef = useRef(null);

    const crawlSpeed = 35;
    
    // We need these offsets to account for the perspective of the div.
    // Im sure you could do some math to get the exact number but considering
    // this works fine i think that implementation would be overkill.
    const bottomOffset = 50;
    const topOffset = 150;

    useEffect(() => {
        if (!text || !outerContainerRef.current || !textRef.current) {
            return;
        } 

        const outerOffsetHeight = outerContainerRef.current.offsetHeight;
        const textOffsetHeight = textRef.current.offsetHeight;
        const scrollHeight = outerOffsetHeight + textOffsetHeight * 2;

        innerContainerRef.current.style.height = `${scrollHeight}px`;
        basePos.current = scrollHeight - textOffsetHeight + bottomOffset;
        textRef.current.style.top = `${basePos.current}px`;
        pos.current = basePos.current;

        if (!interval.current) {
            interval.current = setInterval(() => {
                textRef.current.style.top = `${pos.current}px`;
                if (pos.current <= (0 - topOffset)) {
                    pos.current = basePos.current;
                } else {
                    pos.current--;
                }
            }, crawlSpeed);
        }

        return () => {
            // look into this, leaving for now.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (interval.current && !outerContainerRef.current) {
                clearInterval(interval.current);
            }
        }
    }, [text]);

    return (
        <Box p={1}>
            <Card elevation={3} ref={outerContainerRef} className={styles.outerContainer}>
                <Box ref={innerContainerRef} className={styles.innerContainer}>
                    <Box ref={textRef} variant='body1' className={styles.text}>
                        <Typography variant='h4'>{title}</Typography>
                        <Typography variant='h6'>Episode {episodeId}</Typography>
                        <Typography variant='body1'>{text}</Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
};
MovieCrawlText.propTypes = {
    text: PropTypes.string,
    episodeId: PropTypes.string,
    title: PropTypes.string
};

export default MovieCrawlText;