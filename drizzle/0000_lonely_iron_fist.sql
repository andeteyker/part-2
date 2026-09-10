CREATE TABLE `studio_pages` (
	`slug` text PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`published` text,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated` text NOT NULL
);
