import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

export const useUpdataBlog = () => {
  const queryClient = useQueryClient()

  return useMutation((data) => blogService.patchBlog(data.id, data), {
    onMutate: async (newBlog) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['blog', newBlog.id] })

      // Snapshot the previous value
      const previousBlog = queryClient.getQueryData(['blog', newBlog.id])

      // Optimistically update to the new value
      queryClient.setQueryData(['blog', newBlog.id], (oldData) => ({ ...oldData, ...newBlog }))

      // Return a context object with the snapshotted value
      return { previousBlog }
    },
    onError: (error, newBlog, context) => {
      queryClient.setQueryData(['blog', context.newBlog.id], context.previousBlog)
    }
  })
}
