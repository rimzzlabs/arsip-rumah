CREATE TABLE `bill` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`bill_name` text NOT NULL,
	`bill_name_iv` text NOT NULL,
	`bill_name_auth_tag` text NOT NULL,
	`bill_number` text NOT NULL,
	`bill_number_iv` text NOT NULL,
	`bill_number_auth_tag` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
