window.addEventListener( 'DOMContentLoaded', () => {
	const spotlight = document.querySelector( '.hd-spotlight-pointer' );
	const container = document.querySelector( '.wp-block-hd-spotlight-header' );

	if ( ! spotlight || ! container ) {
		return;
	}

	let currentX = 50;
	let currentY = 50;
	let targetX = 50;
	let targetY = 50;
	let animationFrame;
	let isVisible = true;
	let hasDisappeared = false;

	window.addEventListener( 'scroll', () => {
		if ( hasDisappeared ) {
			return;
		}

		// Check if mobile/tablet using window width
		// if ( window.innerWidth <= 1024 ) {
		//     return;
		// }

		const scrollPosition = window.scrollY;
		const threshold = 100;

		isVisible = false;
		hasDisappeared = true;
		spotlight.classList.add( 'is-hidden' );
		container.classList.add( 'is-full' );

		const scrollPercentage = Math.min( scrollPosition / threshold, 1 );
		targetY = 100 * scrollPercentage; // Pull towards bottom
		targetX = 50; // Center horizontally

		if ( ! animationFrame ) {
			animationFrame = window.requestAnimationFrame( updateSpotlight );
		}
	} );

	const lerp = ( start, end, factor ) => {
		return start + ( end - start ) * factor;
	};

	const updateSpotlight = () => {
		if ( ! isVisible ) {
			window.cancelAnimationFrame( animationFrame );
			animationFrame = null;
			return;
		}

		currentX = lerp( currentX, targetX, 0.1 );
		currentY = lerp( currentY, targetY, 0.1 );

		spotlight.style.backgroundImage = `radial-gradient(circle at ${ currentX }% ${ currentY }%, transparent 130px, rgb(255, 255, 255) 130px 130px)`;

		animationFrame = window.requestAnimationFrame( updateSpotlight );
	};

	container.addEventListener( 'mousemove', ( e ) => {
		const rect = container.getBoundingClientRect();
		targetX = ( ( e.clientX - rect.left ) / rect.width ) * 100;
		targetY = ( ( e.clientY - rect.top ) / rect.height ) * 100;

		if ( ! animationFrame ) {
			animationFrame = window.requestAnimationFrame( updateSpotlight );
		}
	} );

	container.addEventListener( 'mouseleave', () => {
		window.cancelAnimationFrame( animationFrame );
		animationFrame = null;
	} );
} );
