export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-4 text-gray-700">Carregando...</span>
        </div>
    );
}