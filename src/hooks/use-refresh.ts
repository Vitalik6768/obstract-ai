import { useQueryClient } from "node_modules/@tanstack/react-query/build/modern/QueryClientProvider"



const useRefresh = () => {
    const queryClient = useQueryClient()
    return async () => {
        await queryClient.refetchQueries({
            type: 'active'
        })
    }
 
}

export default useRefresh