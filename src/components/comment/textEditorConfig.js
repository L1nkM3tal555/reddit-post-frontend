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
	Undo,
} from 'ckeditor5';

export const config =
{
    toolbar: {
        items: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'link', 'insertTable', 'blockQuote', '|', 'outdent', 'indent'],
        shouldNotGroupWhenFull: true
    },
    autoGrow_minHeight: 200, // Altura mínima del editor
    autoGrow_maxHeight: 600, // Altura máxima a la que puede crecer
    autoGrow_bottomSpace: 50, // Espacio inferior extra cuando llega al máximo
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
    placeholder: 'What are your thoughts?',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    contentsCss: 'body { font-size: 5px; }'
}