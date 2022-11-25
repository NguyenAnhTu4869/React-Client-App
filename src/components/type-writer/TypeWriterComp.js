import React from 'react';
import Typewriter from 'typewriter-effect';

const TypeWriterComp = ({ text }) => (
	<Typewriter
		options={{
			strings: text,
			autoStart: true,
			loop: true,
			skipAddStyles: true,
		}}
		onInit={(typewriter) => {
			typewriter.changeDeleteSpeed({ speed: 1 });
		}}
	/>
);

export default TypeWriterComp;
