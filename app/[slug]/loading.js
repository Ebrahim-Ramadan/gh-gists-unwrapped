import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';

export default function Loading() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <AspectRatio ratio="3/4">
        <Skeleton variant="overlay">
          
        </Skeleton>
      </AspectRatio>
        
    </Card>
  );
}