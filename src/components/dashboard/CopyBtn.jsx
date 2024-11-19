'use client'
import { ClipboardIcon } from '@heroicons/react/outline'


const CopyBtn = ({ spacename }) => {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${spacename}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
            alert('Copied to clipboard!'); 
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div onClick={() => copyToClipboard()}>
            <ClipboardIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
    )
}

export default CopyBtn