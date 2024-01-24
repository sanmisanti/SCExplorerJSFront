import s from './Footer.module.scss';
import { Container } from 'react-bootstrap';
import Logo from '../../assets/logos/SALTACAT-LOGO-Inverted.png';
export const Footer = () => {
	return (
		<footer className={s.footer}>
			<Container className={s.container}>
				<div className={s.content}>
					<div className={s.logoContainer}>
						<img src={Logo} alt='Logo' className={s.logo} />
						<p>Catalogo de Bienes y Servicios de la Provincia de Salta</p>
					</div>
					<div className={`vr ${s.vr}`}></div>
					<div className={s.infoContainer}>
						<span className={s.infoTitle}>
							<h5>
								Órgano Rector:{' '}
								<span>
									Subsecretaría de Procedimientos de Contrataciones de Bienes y
									Servicios
								</span>
							</h5>
						</span>
						<span className={s.infoLine}>
							<span className='material-symbols-outlined'>location_on</span>
							<p>
								Centro Cívico Grand Bourg - Av. Los Incas S/N - 3º Bloque - Ala
								Este
							</p>
						</span>
						<span className={s.infoLine}>
							<span className='material-symbols-outlined'>mail</span>
							<p>secretariadecontrataciones@salta.gov.ar</p>
						</span>
						<span className={s.infoLine}>
							<span className='material-symbols-outlined'>phone_callback</span>
							<p>0387-4364344 / 0387-4362309</p>
						</span>
					</div>
				</div>
				<div className={s.copyright}>
					<p>
						Subsecretaría de procedimientos de Contrataciones - ©{' '}
						{new Date().getFullYear()} SALTA.CAT - Todos los derechos reservados
					</p>
				</div>
			</Container>
		</footer>
	);
};
