import {
	AccessibilityHelp,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	Indent,
	Italic,
	Link,
	Paragraph,
	SelectAll,
	Table,
	TableToolbar,
	Underline,
	Undo
} from 'ckeditor5';

export const config =
{
    toolbar: {
        items: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'link', 'insertTable', 'blockQuote', '|', 'outdent', 'indent'],
        shouldNotGroupWhenFull: true
    },
    plugins: [
        AccessibilityHelp,
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        Indent,
        Italic,
        Link,
        Paragraph,
        SelectAll,
        Table,
        TableToolbar,
        Underline,
        Undo
    ],
    initialData:
        '',
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    placeholder: '',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
}