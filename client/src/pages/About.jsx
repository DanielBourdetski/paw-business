import { Logo } from '../components/common/Logos';

const About = () => {
	return (
		<div>
			<h1 className='text-2xl text-center italic font-semibold my-4'>
				We are Paw Business
			</h1>

			<div className='w-5/6 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-x-20 mt-12'>
				<Logo className='w-20 md:w-fit my-10 md:mt-0' />

				<p className='flex flex-col gap-y-4 mx-auto'>
					<span>
						We are animal lovers, and we want to help make the world a better
						place for all of them!
					</span>

					<span>
						Purrrfect for all the animal lovers people! Cats and dogs, lizards
						and cats, cows and turtles - we love them all.
					</span>

					<span>
						Just as humans, animals deserve to be healthy, happy, and safe. We
						think your pet deserves the best! That's why we offer the best
						products for you and your furry friends.
					</span>
				</p>
			</div>
		</div>
	);
};

export default About;
