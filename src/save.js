import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( props ) {
	const blockProps = useBlockProps.save();

	const { attributes } = props;
	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};

	return (
		<div { ...blockProps } style={ blockStyle }>
			<InnerBlocks.Content />
			<div className="hd-spotlight-pointer"/>
		</div>
	);
}
