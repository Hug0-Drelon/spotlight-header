import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ResponsiveWrapper
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { media } = useSelect(
		( select ) => {
			return {
				media: attributes.mediaId > 0 ? select( coreStore ).getMedia( attributes.mediaId ) : undefined
		};
	}, [ attributes.mediaId ] );

	const blockProps = useBlockProps();

	const removeMedia = () => {
		setAttributes( {
			mediaId: 0,
			mediaUrl: ''
		} );
	}

 	const onSelectMedia = (media) => {
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url
		} );
	}

	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'hd-spotlight-content' },
		{
			allowedBlocks: [ 'core/paragraph', 'core/heading', 'core/quote' ],
			templateLock: false,
		}
	);

	return (
		<>
			<div { ...blockProps } style={ blockStyle }>
				<InspectorControls>
					<PanelBody
						title={ __( 'Background image', 'spotlight-header' )}
						initialOpen={ true }
					>
						<div className="editor-post-featured-image">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectMedia}
									value={attributes.mediaId}
									allowedTypes={ ['image'] }
									render={ ( { open } ) => (
										<Button
											className={ attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
											onClick={open}
										>
											{ attributes.mediaId == 0 && __( 'Select an image', 'spotlight-header')}
											{ attributes.mediaId > 0 &&
													<ResponsiveWrapper
														naturalWidth={ media?.media_details.width }
														naturalHeight={ media?.media_details.height }
												>
													<img src={ media?.source_url } />
												</ResponsiveWrapper>
											}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{ attributes.mediaId > 0 &&
								<MediaUploadCheck>
									<MediaUpload
										title={ __( 'Replace image', 'spotlight-header' )}
										value={ attributes.mediaId }
										onSelect={ onSelectMedia }
										allowedTypes={ ['image'] }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
												variant="primary"
												style={ { marginTop: '8px' } }
											>
												{ __( 'Replace', 'spotlight-header' ) }
											</Button>
										)}
									/>
								</MediaUploadCheck>
							}
							{ attributes.mediaId > 0 &&
								<MediaUploadCheck>
									<Button
										onClick={ removeMedia }
										variant="link"
										isDestructive
										style={ { marginLeft: '8px', marginTop: '8px' } }
									>
										{ __( 'Remove', 'spotlight-header' ) }
									</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</InspectorControls>
				<div className="hd-spotlight-pointer"/>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
