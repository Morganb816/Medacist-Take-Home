import { Skeleton } from '@material-ui/lab';
import React from 'react';

/**
 * @name SkeletonLoader
 * @description This component will render skeleton components around your component while it loads
 * @component
 */
const SkeletonLoader = ({isLoading, children}) => isLoading ? (
    <Skeleton>
        {console.log('here', isLoading)}
        {children}
    </Skeleton>
) : (
    <>
    {children}
    </>
);

export default SkeletonLoader;