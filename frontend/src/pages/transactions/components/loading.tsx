import { Skeleton } from '@/components/ui/skeleton.tsx';

const Loading = () => {
  return (
    <div className='grid grid-cols-5 gap-2 mt-4'>
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
    </div>
  );
};

export default Loading;
