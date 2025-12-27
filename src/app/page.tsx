"use client"
import { QRCodeCanvas } from 'qrcode.react';
import { FaUpload } from "react-icons/fa";
import React, { useRef, useState } from 'react';

export default function Home() {
	const [LinkValue, setLinkValue] = useState<string>('');
	const [fgColor, setfgColor] = useState<string>('#000000');
	const [bgColor, setbgColor] = useState<string>('#ffffff');
	const [logoUrl, setlogoUrl] = useState<string>('https');
	const [logoSize, setlogoSize] = useState<number>(38);
	const qrCodeRef = useRef<HTMLDivElement>(null);


	const handLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.result) {
					setlogoUrl(reader.result as string);
				}
			}
			reader.readAsDataURL(file);
		}
	}

	const handleDownload = () => {
		if (!qrCodeRef.current) return;
		const canvas = qrCodeRef.current.querySelector("canvas");

		if (!canvas) return;

		const link = document.createElement("a");
		link.href = canvas.toDataURL("imagem/png");
		link.download = "qrcode.png";
		link.click();
	}

	return (

		<main className="container">
			<section className="title-container">

				<h1 className="page-title">Gere e costumize
					Qr codes <span>dinâmicos</span>
				</h1>



			</section >

			<section className="qr-code-container">
				<div className="qr-code">
					<div className="link-input">
						<label htmlFor="link">
							Digite seu link
						</label>
						<input
							type="text"
							id="link"
							placeholder="Seu link aqui"
							value={LinkValue}
							onChange={(e) => setLinkValue(e.target.value)}
						/>
					</div>
					<div className="qr-code-preview">
						<p>
							Qr Code Preview
						</p>

						<div ref={qrCodeRef}>
							<QRCodeCanvas
								value={LinkValue}
								title={LinkValue}
								size={228}
								bgColor={bgColor}
								fgColor={fgColor}
								level={"H"}
								imageSettings={{
									src: logoUrl,
									x: undefined,
									y: undefined,
									height: logoSize,
									width: logoSize,
									opacity: 1,
									excavate: true,
								}}
							/>
						</div>
					</div>
				</div>

				<div className="qr-code-customization">
					<h3>
						Cores
					</h3>

					<div className='input-container colors'>

						<div className='input-box'>
							<label htmlFor="fgColor">
								Cor principal
							</label>
							<input
								type="color"
								className='input-color'
								id="fgColor"
								value={fgColor}
								onChange={(e) => setfgColor(e.target.value)}
							/>

						</div>

						<div className='input-box'>
							<label htmlFor="bgColor">
								Cor do fundo
							</label>
							<input
								type="color"
								className='input-color'
								id="bgColor"
								value={bgColor}
								onChange={(e) => setbgColor(e.target.value)}
							/>

						</div>

					</div>



					<div className='customization-container'>
						<h3>
							Logo
						</h3>
						<div className='input-container'>

							<div className='input-box'>
								<label htmlFor="logo">
									Insira seu logo
								</label>
								<input
									type="file"
									className='input-file'
									id="logo"
									accept='image/*'
									onChange={handLogoChange}
								/>

								<button className='input-file-button'>
									<FaUpload />

									Escolher arquivo
								</button>

							</div>

							<div className='input-box'>
								<label htmlFor="logo-size">
									Tamanho da logo
								</label>
								<select
									name="logo-size"
									id="logo-size"
									value={logoSize}
									onChange={(e) => setlogoSize(Number(e.target.value))}

								>
									<option value="24">24px x 24px</option>
									<option value="38">38px x 38px</option>
									<option value="50">50px x 50px</option>
									<option value="80">80px x 80px</option>


								</select>

							</div>
						</div>


						<button className='download-button' onClick={handleDownload}>
							Baixar Qr Code
						</button>

					</div>
				</div>



			</section>
		</main>
	);
}