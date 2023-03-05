use anchor_lang::prelude::*;

declare_id!("4R6YqfBNVnjaohhXGxviSuz3wMuuZ7ZxY7GxmSVxm5ah");

#[program]
pub mod calculator {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Addition>, a: i64, b: i64) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = a + b;
        Ok(())
    }

    pub fn sub(ctx: Context<Subtraction>, a: i64, b: i64) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = a - b;
        Ok(())
    }

    pub fn mul(ctx: Context<Multiply>, a: i64, b: i64) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = a * b;
        Ok(())
    }

    pub fn div(ctx: Context<Divide>, a: i64, b: i64) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = a / b;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 264)]
    calculator: Account<'info, Calculator>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,

}
#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiply<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Divide<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
}